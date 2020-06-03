import { monoidAll } from 'fp-ts/es6/Monoid';
import { pipe } from 'fp-ts/es6/pipeable';
import { tuple } from 'fp-ts/es6/function';
import { flatten, zip, foldMap } from 'fp-ts/es6/Array';
import { right, left } from 'fp-ts/es6/Either';
import { some } from 'fp-ts/es6/Option';
const recycleAnyToNext = {
    recycle: (_prev, next) => next
};
export const fromRecycle = (recycle) => ({
    recycle: (prev, next) => (prev === next ? prev : recycle(prev, next))
});
/**
 *  @since 0.0.1
 * recyclePrimitive always returns the next version as there's no reference for primitives
 */
export const recyclePrimitive = () => recycleAnyToNext;
/**
 *  @since 0.0.1
 */
export const recycleBoolean = recyclePrimitive();
/**
 *  @since 0.0.1
 */
export const recycleString = recyclePrimitive();
/**
 *  @since 0.0.1
 */
export const recycleNumber = recyclePrimitive();
/**
 *  @since 0.0.1
 */
export const recycleBigint = recyclePrimitive();
/**
 *  @since 0.0.1
 */
export const contramap = (recycle, f) => fromRecycle((prev, next) => {
    const fPrev = f(prev);
    return recycle.recycle(fPrev, f(next)) === fPrev ? prev : next;
});
/**
 *  @since 0.0.1
 */
export const getOption = (recycle) => fromRecycle((prev, next) => {
    if (prev._tag === 'Some' && next._tag === 'Some') {
        const r = recycle.recycle(prev.value, next.value);
        return r === prev.value ? prev : next.value === r ? next : some(r);
    }
    else {
        return next;
    }
});
/**
 *  @since 0.0.1
 */
// TODO: needs to share as much as possible..
// TODO: getArrayByKey is a Config optim
export const getArray = (recycle) => fromRecycle((prev, next) => prev.length !== next.length
    ? next
    : // TODO: Optimize
        pipe(zip(prev, next), foldMap(monoidAll)(([p, n]) => recycle.recycle(p, n) === p))
            ? prev
            : next);
/**
 * version discarding all collisions (including the initial collided value)
 */
// const mapArrayToIndexedRecord = <A>(getKey: (a: A) => string) => (arr: A[]): Record<string, A> => {
//   // holds null if collision
//   const res: Record<string, A | null> = {}
//   for (const a of arr) {
//     const k = getKey(a)
//     const v = res[k]
//     // collision
//     if (v !== undefined) {
//       if (v !== null) {
//         res[k] = null
//       }
//     } else {
//       res[k] = a
//     }
//   }
//   return removeNullEntries(res)
// }
const mapArrayToIndexedRecord = (getKey) => (arr) => {
    const res = {};
    const l = arr.length;
    for (let i = 0; i < l; i++) {
        const a = arr[i];
        res[getKey(a)] = a;
    }
    return res;
};
/**
 *
 */
export const getArrayByKey = (getKey) => (recycle) => fromRecycle((prev, next) => {
    const res = new Array(next.length);
    let recyclable = true;
    let isNext = true;
    const uniq = mapArrayToIndexedRecord(getKey)(prev);
    const l = next.length;
    for (let index = 0; index < l; index++) {
        const n = next[index];
        const p = uniq[getKey(n)];
        if (p !== undefined) {
            const r = recycle.recycle(p, n);
            res[index] = r;
            if (r !== p) {
                recyclable = false;
            }
            if (r !== n) {
                isNext = false;
            }
        }
        else {
            res[index] = n;
            recyclable = false;
        }
    }
    return recyclable ? prev : isNext ? next : res;
});
/**
 *  @since 0.0.1
 */
export const getEither = (recycleE, recycleA) => fromRecycle((prev, next) => {
    if (prev._tag === next._tag) {
        if (prev._tag === 'Right') {
            const pr = prev.right;
            const nr = next.right;
            const r = recycleA.recycle(pr, nr);
            return pr === r ? prev : nr === r ? next : right(r);
        }
        else {
            const pl = prev.left;
            const nl = next.left;
            const l = recycleE.recycle(pl, nl);
            return pl === l ? prev : nl === l ? next : left(l);
        }
    }
    else {
        return next;
    }
});
/**
 *  @since 0.0.1
 */
export const getStruct = (recycles) => {
    const recyclesArr = Object.keys(recycles).map((k) => tuple(k, recycles[k].recycle));
    return fromRecycle((prev, next) => {
        const res = {};
        let recyclable = true;
        let isNext = true;
        for (const [k, recycle] of recyclesArr) {
            const p = prev[k];
            const n = next[k];
            const r = recycle(p, n);
            res[k] = r;
            if (r !== p) {
                recyclable = false;
            }
            if (r !== n) {
                isNext = false;
            }
        }
        return recyclable ? prev : isNext ? next : res;
    });
};
/**
 *  @since 0.0.1
 */
export const getPartialStruct = (recycles) => {
    const recyclesArr = Object.keys(recycles).map((k) => tuple(k, recycles[k].recycle));
    return fromRecycle((prev, next) => {
        const res = {};
        let recyclable = true;
        let isNext = true;
        for (const [k, recycle] of recyclesArr) {
            if (k in next) {
                const p = prev[k];
                const n = next[k];
                const r = recycle(p, n);
                res[k] = r;
                if (r !== p) {
                    recyclable = false;
                }
                if (r !== n) {
                    isNext = false;
                }
            }
            else {
                if (k in prev) {
                    recyclable = false;
                }
            }
        }
        return recyclable ? prev : isNext ? next : res;
    });
};
/**
 *  @since 0.0.1
 */
export const getSet = (_recycle) => fromRecycle((_prev, next) => next // TODO: revise strategy
);
const removeNullEntries = (r) => {
    for (const k in r) {
        if (r.hasOwnProperty(k)) {
            if (r[k] === null) {
                delete r[k];
            }
        }
    }
    return r;
};
const assumeNotNull = (r) => r;
export const setToRecord = (f) => (s) => {
    const uniq = {};
    const colliding = {};
    let mustFilterNull = false;
    for (const v of s.values()) {
        const k = f(v);
        if (k in uniq) {
            const ov = uniq[k];
            if (ov === null) {
                colliding[k].push(v);
            }
            else {
                colliding[k] = [ov, v];
                uniq[k] = null;
                mustFilterNull = true;
            }
        }
        else {
            uniq[k] = v; // General case
        }
    }
    return { uniq: mustFilterNull ? removeNullEntries(uniq) : assumeNotNull(uniq), colliding };
};
const recordToSet = (r, coll) => new Set([...Object.values(r), ...flatten(Object.values(coll))]);
const isEmpty = (x) => Object.keys(x).length === 0;
/**
 *  @since 0.0.1
 */
export const getStrMap = ({ recycle }) => fromRecycle((prev, next) => {
    const nextKeys = Object.keys(next);
    const res = {};
    let recyclable = true;
    let isNext = true;
    for (const k of nextKeys) {
        if (next.hasOwnProperty(k)) {
            const p = prev[k];
            const n = next[k];
            const r = p === undefined ? n : recycle(p, n);
            res[k] = r;
            if (r !== p) {
                recyclable = false;
            }
            if (r !== n) {
                isNext = false;
            }
        }
    }
    return recyclable && Object.keys(prev).length === nextKeys.length ? prev : isNext ? next : res;
});
/**
 *  @since 0.0.1
 */
export const getSetByKey = (getKey) => (recycle) => {
    const toRecord = setToRecord(getKey);
    return fromRecycle((prevS, nextS) => {
        const { uniq: prev, colliding: prevColl } = toRecord(prevS);
        const { uniq: next, colliding: nextColl } = toRecord(nextS);
        const res = getStrMap(recycle).recycle(prev, next);
        return res === prev && isEmpty(prevColl) && isEmpty(nextColl)
            ? prevS
            : res === next && isEmpty(nextColl)
                ? nextS
                : isEmpty(next)
                    ? nextS
                    : recordToSet(res, nextColl);
    });
};
