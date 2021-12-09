'use strict';

const Queue = require('../../src/helpers/queue');

describe('Queue', () => {
  describe('When handling Numbers', () => {
    test('Should be able to enqueue', () => {
      const queue = new Queue();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.size()).toBe(3);
      expect(queue.fetchAll()).toStrictEqual([1, 2, 3]);
    });

    test('Should be able to dequeue', () => {
      const queue = new Queue();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.size()).toBe(3);
      expect(queue.has(1)).toBeTruthy();
      expect(queue.fetchAll()).toStrictEqual([1, 2, 3]);
      expect(queue.dequeue()).toBe(1);
      expect(queue.has(1)).toBeFalsy();
      expect(queue.fetchAll()).toStrictEqual([2, 3]);
    });
  });

  describe('When handling Strings', () => {
    test('Should be able to enqueue', () => {
      const queue = new Queue();
      queue.enqueue('a');
      queue.enqueue('b');
      queue.enqueue('c');
      expect(queue.size()).toBe(3);
      expect(queue.fetchAll()).toStrictEqual(['a', 'b', 'c']);
    });

    test('Should be able to dequeue', () => {
      const queue = new Queue();
      queue.enqueue('a');
      queue.enqueue('b');
      queue.enqueue('c');
      expect(queue.size()).toBe(3);
      expect(queue.fetchAll()).toStrictEqual(['a', 'b', 'c']);
      expect(queue.dequeue()).toBe('a');
      expect(queue.fetchAll()).toStrictEqual(['b', 'c']);
    });
  });

  describe('When handling Arrays', () => {
    test('Should be able to enqueue', () => {
      const queue = new Queue();
      queue.enqueue([1, 2]);
      queue.enqueue([2, 2]);
      queue.enqueue([4, 0]);
      expect(queue.size()).toBe(3);
      expect(queue.hasDeepCheck([2, 2])).toBeTruthy();
      expect(queue.hasDeepCheck([0, 0])).toBeFalsy();
      expect(queue.fetchAll()).toStrictEqual([
        [1, 2],
        [2, 2],
        [4, 0]
      ]);
    });

    test('Should be able to dequeue', () => {
      const queue = new Queue();
      queue.enqueue([1, 2]);
      queue.enqueue([2, 2]);
      queue.enqueue([4, 0]);
      expect(queue.size()).toBe(3);
      expect(queue.fetchAll()).toStrictEqual([
        [1, 2],
        [2, 2],
        [4, 0]
      ]);
      expect(queue.dequeue()).toStrictEqual([1, 2]);
      expect(queue.fetchAll()).toStrictEqual([
        [2, 2],
        [4, 0]
      ]);
    });
  });
});
