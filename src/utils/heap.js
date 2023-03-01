class Heap {
	/**
	 * Create a new priority queue with the
	 * given comparision function in comparator.
	 * @param {func} comparator
	 */
	constructor(comparator = (a, b) => a > b) {
		this._heap = [];
		this._comparator = comparator;

		this.top = 0;
		this.parent = (i) => ((i + 1) >>> 1) - 1;
		this.left = (i) => (i << 1) + 1;
		this.right = (i) => (i + 1) << 1;
	}

	/**
	 * Returns the size of the heap.
	 * @returns {int} Current size of the heap.
	 */
	size = () => {
		return this._heap.length;
	};

	/**
	 * Determine if the heap is empty or not.
	 * @returns {Boolean} If the heap is empty or not.
	 */
	isEmpty = () => {
		return this.size() === 0;
	};

	/**
	 * Push the given object onto the heap and rectify it.
	 * @param {Object} object
	 */
	push = (...objects) => {
		objects.forEach((object) => {
			this._heap.push(object);
			this._siftUp();
		});
	};

	/**
	 * Pop the first element from the queue and return it.
	 * @return {Object} The first element in the queue.
	 */
	pop = () => {
		if (this.isEmpty() === false) {
			const retValue = this._heap[0];
			this._siftDown();
			return retValue;
		} else {
			return null;
		}
	};

	/**
	 * Return the min value without popping it.
	 * @return {Object} The first element in the queue.
	 */
	peek = () => {
		if (this.isEmpty() === false) {
			return this._heap[0];
		} else {
			return null;
		}
	};

	_compare = (a, b) => {
		return this._comparator(this._heap[a], this._heap[b]);
	};

	_swap = (a, b) => {
		let temp = this._heap[a];
		this._heap[a] = this._heap[b];
		this._heap[b] = temp;
	};

	/**
	 * Sifts the first element of the heap into its proper place.
	 * @returns null
	 */
	_siftDown = () => {
		this._swap(0, this.size() - 1);
		this._heap = this._heap.slice(0, this.size() - 1);

		let node = 0;
		while (
			(this.left(node) < this.size() &&
				this._compare(this.left(node), node)) ||
			(this.right(node) < this.size() &&
				this._compare(this.right(node), node))
		) {
			let maxChild =
				this.right(node) < this.size() &&
				this._compare(this.right(node), this.left(node))
					? this.right(node)
					: this.left(node);
			this._swap(node, maxChild);
			node = maxChild;
		}
	};

	/**
	 * Sift the newest element into its proper position.
	 * @returns null
	 */
	_siftUp = () => {
		let currNode = this.size() - 1;

		while (currNode > 0) {
			if (this._compare(currNode, this.parent(currNode))) {
				this._swap(currNode, this.parent(currNode));
				currNode = this.parent(currNode);
			} else {
				break;
			}
		}
	};
}

export default Heap;
