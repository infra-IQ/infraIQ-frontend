import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { Input } from "./Input";

const TextInputNode = ({ id, data }: NodeProps) => {
  return (
    <div className="p-4 bg-white border rounded shadow w-[150px]">
      <Handle type="target" position={Position.Top} />
      <p className="text-xs mb-1">{data.label}</p>
      <Input placeholder="customize..." className="!py-2 ring-0" />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TextInputNode;
