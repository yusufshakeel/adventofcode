'use strict';
module.exports = function Queue() {
  let queue = [];

  const enqueue = data => (queue = [...queue, data]);

  const dequeue = () => {
    const [first, ...rest] = queue;
    queue = [...rest];
    return first;
  };

  const size = () => queue.length;

  const has = data => !!queue.find(item => item === data);

  const hasDeepCheck = data => !!queue.find(item => JSON.stringify(item) === JSON.stringify(data));

  const fetchAll = () => queue;

  return { enqueue, dequeue, size, has, fetchAll, hasDeepCheck };
};
