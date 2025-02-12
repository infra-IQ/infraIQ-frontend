import { useCallback, DragEvent, useEffect } from "react";
import ReactFlow, {
  Node,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import React from "react";
import TextInputNode from "./ui/CustomNode";

const tools = ["Docker", "Node.Js", "Versioning", "Route Controller"];
const databases = ["PostgreSQL", "mySQLl", "MongoDB"];

const nodeTypes = {
  textInputNode: TextInputNode,
};

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    console.log({ edges });
  }, [edges]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Get the position where the node was dropped
      const reactFlowBounds = document
        .querySelector(".react-flow")
        ?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 75,
        y: event.clientY - reactFlowBounds.top - 25,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "textInputNode",
        position,
        data: { label: type },
        style: {
          background: "white",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      <div className="h-12 border-b bg-white flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm">
            <span className="font-medium">R101-Salesforce-Auth</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">test</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Background />
          <Controls />
          <Panel
            position="top-left"
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {tools.map((type) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => onDragStart(e, type)}
                  className="w-36 py-2 px-4 bg-white rounded border shadow-sm flex items-center tex-center justify-center cursor-move hover:border-purple-500 transition-colors"
                >
                  {type}
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            position="top-right"
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {databases.map((type) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => onDragStart(e, type)}
                  className="w-36 py-2 px-4 bg-white rounded border shadow-sm flex items-center tex-center justify-center cursor-move hover:border-purple-500 transition-colors"
                >
                  {type}
                </div>
              ))}
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Canvas;
