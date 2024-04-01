import { describe, it, assert } from 'vitest';
import Obj from '../pkg/obj';

describe("obj", () => {
    describe("exclude", () => {
        it("should exclude properties from an object", () => {
            const obj = {
                a: 1,
                b: 2,
                c: 3,
            };

            const result = Obj.exclude(obj, 'a', 'c');

            assert(result.a === undefined);
            assert(result.b === 2);
            assert(result.c === undefined);
        });
    })

    describe('pick', () => {
        it('should pick properties from an object', () => {
            const obj = {
                a: 1,
                b: 2,
                c: 3,
            };

            const result = Obj.pick(obj, 'a', 'c');

            assert(result.a === 1);
            assert(result.b === undefined);
            assert(result.c === 3);
        });
    })

    describe('hasAllKeys', () => {
        it('should return true if all keys are present', () => {
            const obj = {
                a: 1,
                b: 2,
                c: 3,
            };

            const result = Obj.hasAllKeys(obj, 'a', 'b', 'c');

            assert(result === true);
        });

        it('should return false if any key is missing', () => {
            const obj = {
                a: 1,
                b: 2,
            };

            // @ts-expect-error
            const result = Obj.hasAllKeys(obj, 'a', 'b', 'c');

            assert(result === false);
        });
    })
})
