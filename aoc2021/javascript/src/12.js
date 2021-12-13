'use strict';

const Queue = require('../src/helpers/queue');

const isLowerCaseEdge = edge => /^[a-z]{1,}$/.test(edge);

const getGraph = input => {
  let graph = {};
  input.forEach(line => {
    const [startVertex, endVertex] = line.split('-');
    const existingStartVertexAdjacentVertices = graph[startVertex] ?? [];
    const existingEndVertexAdjacentVertices = graph[endVertex] ?? [];
    graph = {
      ...graph,
      [startVertex]: [...existingStartVertexAdjacentVertices, endVertex],
      [endVertex]: [...existingEndVertexAdjacentVertices, startVertex]
    };
  });
  return graph;
};

const START_VERTEX = 'start';
const END_VERTEX = 'end';

const isStartOrEndVertex = vertex => [START_VERTEX, END_VERTEX].includes(vertex);

function part1(input) {
  let graph = getGraph(input);
  let totalPaths = 0;

  const queue = Queue();

  // we start from the 'start' vertex
  queue.enqueue({
    currentVertex: START_VERTEX,
    lowerCaseVerticesVisited: new Set([START_VERTEX])
  });

  while (queue.size()) {
    const { currentVertex, lowerCaseVerticesVisited } = queue.dequeue();

    // we reached the 'end' vertex so, we found a path
    if (currentVertex === END_VERTEX) {
      totalPaths++;
      continue;
    }

    // get all the adjacent vertices of the current vertex
    for (let currentAdjacentVertex of graph[currentVertex]) {
      // we have not yet visited the current adjacent vertex of the current vertex
      if (!lowerCaseVerticesVisited.has(currentAdjacentVertex)) {
        let newlyVisitedLowerCaseVertex = new Set(lowerCaseVerticesVisited);

        if (isLowerCaseEdge(currentAdjacentVertex)) {
          newlyVisitedLowerCaseVertex.add(currentAdjacentVertex);
        }

        queue.enqueue({
          currentVertex: currentAdjacentVertex,
          lowerCaseVerticesVisited: newlyVisitedLowerCaseVertex
        });
      }
    }
  }

  return totalPaths;
}

function part2(input) {
  let graph = getGraph(input);
  let totalPaths = 0;

  const queue = Queue();

  // we start from the 'start' vertex
  queue.enqueue({
    currentVertex: START_VERTEX,
    lowerCaseVerticesVisited: new Set([START_VERTEX]),
    oneLowerCaseVertexVisitedTwice: null
  });

  while (queue.size()) {
    const { currentVertex, lowerCaseVerticesVisited, oneLowerCaseVertexVisitedTwice } =
      queue.dequeue();

    // we reached the 'end' vertex so, we found a path
    if (currentVertex === END_VERTEX) {
      totalPaths++;
      continue;
    }

    // get all the adjacent vertices of the current vertex
    for (let currentAdjacentVertex of graph[currentVertex]) {
      // we have not yet visited the current adjacent vertex of the current vertex
      if (!lowerCaseVerticesVisited.has(currentAdjacentVertex)) {
        let newlyVisitedLowerCaseVertex = new Set(lowerCaseVerticesVisited);

        if (isLowerCaseEdge(currentAdjacentVertex)) {
          newlyVisitedLowerCaseVertex.add(currentAdjacentVertex);
        }

        queue.enqueue({
          currentVertex: currentAdjacentVertex,
          lowerCaseVerticesVisited: newlyVisitedLowerCaseVertex,
          oneLowerCaseVertexVisitedTwice
        });
      } else if (!oneLowerCaseVertexVisitedTwice && !isStartOrEndVertex(currentAdjacentVertex)) {
        // a lowerCase vertex visited twice
        queue.enqueue({
          currentVertex: currentAdjacentVertex,
          lowerCaseVerticesVisited,
          oneLowerCaseVertexVisitedTwice: currentAdjacentVertex
        });
      }
    }
  }

  return totalPaths;
}

module.exports = { part1, part2 };
