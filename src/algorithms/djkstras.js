import Heap from "../utils/heap";
import { NUM_ROWS, NUM_COLS } from "../utils/constants";

// Let's do some djkstra's
const djkstras = (nodes, source, sink) => {
	// Get a list of all nodes.
	const graph = getGraph(nodes);
	const priorityQueue = new Heap((a, b) => a[0] < b[0]);

	graph[source].distance = 0;
	priorityQueue.push([graph[source].distance, graph[source]]);

	while (!priorityQueue.isEmpty()) {
		const poppedNode = priorityQueue.pop()[1];

		if (poppedNode.visted) {
			continue;
		}

		poppedNode.visted = true;
		getChildren(poppedNode).forEach((childIdx) => {
			let child = graph[childIdx];
			if (!child.visted) {
				let distance = poppedNode.distance + 1;
				if (child.distance === -1 || distance < child.distance) {
					child.backEdge = poppedNode;
					child.distance = distance;
					priorityQueue.push([child.distance, child]);
				}
			}
		});
	}

	// Mark the path from sink to source.
	let currnode = graph[sink].backEdge;

	while (currnode !== graph[source]) {
		currnode.type = "ShortestPath";
		currnode = currnode.backEdge;
	}

	return graph;
};

const getChildren = (node) => {
	const nodeCoord = node.row * NUM_COLS + node.col;

	const up = nodeCoord - NUM_COLS;
	const down = nodeCoord + NUM_COLS;
	const left = nodeCoord - 1;
	const right = nodeCoord + 1;

	let children = [];

	if (up >= 0) {
		children.push(up);
	}
	if (down < NUM_COLS * NUM_ROWS) {
		children.push(down);
	}
	if (left > 0 && left % NUM_COLS !== NUM_COLS - 1) {
		children.push(left);
	}
	if (right % NUM_COLS !== 0) {
		children.push(right);
	}

	return children;
};

const getGraph = (nodes) => {
	return nodes.map((node) => ({
		...node,
		distance: -1,
		backEdge: null,
		visted: node.type === "Wall" ? true : false,
	}));
};

export default djkstras;
