import React, { Component } from "react";

import Node from "./Node";
import "./styles/NodeGrid.css";

export class NodeGrid extends Component {
  state = {
    nodes: [],
    nodeType: "source",
    source: null,
    sink: null,
  };

  constructor(props) {
    super(props);
    this.handleNodeTypeChange = this.handleNodeTypeChange.bind(this);
    this.createNewGrid = this.createNewGrid.bind(this);
    this.changeSource = this.changeSource.bind(this);
    this.changeSink = this.changeSink.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.setSource = this.setSource.bind(this);
    this.setSink = this.setSink.bind(this);
  }

  componentDidMount() {
    this.setState({
      nodes: this.createNewGrid(),
    });
  }

  handleNodeTypeChange = () => {
    this.setState({
      nodeType: this.state.nodeType === "source" ? "sink" : "source",
    });
  };

  createNewGrid = () => {
    let newNodes = [];
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 45; j++) {
        newNodes.push({
          row: i,
          col: j,
          type: "Path",
        });
      }
    }

    return newNodes;
  };

  changeSource = (grid, row, column) => {
    const newGrid = grid.slice();
    const node = newGrid[row * 45 + column];
    const newNode = {
      ...node,
      type: "Source",
    };
    newGrid[row * 45 + column] = newNode;

    if (this.state.source) {
      const oldSource = newGrid[(this.state.source.row, this.state.source.col)];
      const revertedSource = {
        ...oldSource,
        type: "Path",
      };
      newGrid[this.state.source.row * 45 + this.state.source.col] =
        revertedSource;
    }

    this.setState({
      nodes: newGrid,
    });
  };

  changeSink = (grid, row, column) => {
    const newGrid = grid.slice();
    const node = newGrid[row * 45 + column];

    const newNode = {
      ...node,
      type: "Sink",
    };
    newGrid[row * 45 + column] = newNode;

    if (this.state.sink) {
      const oldSink = newGrid[(this.state.sink.row, this.state.sink.col)];
      const revertedSink = {
        ...oldSink,
        type: "Path",
      };
      newGrid[this.state.sink.row * 45 + this.state.sink.col] = revertedSink;
    }

    this.setState({
      nodes: newGrid,
    });
  };

  setSource = (node) => {
    node.type = "Source";
    this.setState({
      source: node,
    });
  };

  setSink = (node) => {
    node.type = "Sink";
    this.setState({
      sink: node,
    });
  };

  handleNodeClick = (node) => {
    if (this.state.nodeType === "source") {
      this.changeSource(this.state.nodes, node.row, node.col, "Source");
      this.setSource(node);
    } else {
      this.changeSink(this.state.nodes, node.row, node.col, "Sink");
      this.setSink(node);
    }
  };

  render() {
    const { nodes } = this.state;
    return (
      <div className="nodeGrid">
        <div className="grid">
          {nodes.map((node, nodeIdx) => {
            return (
              <Node
                key={nodeIdx}
                onClick={() => this.handleNodeClick(node)}
                {...node}
              />
            );
          })}
        </div>
        <div className="menu">
          <button
            onClick={() => this.handleNodeTypeChange()}
            className="changeNodeSelect"
          >{`Change ${
            this.state.nodeType === "source" ? "sink" : "source"
          }`}</button>
        </div>
      </div>
    );
  }
}

export default NodeGrid;
