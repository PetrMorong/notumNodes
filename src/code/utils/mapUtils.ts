import { NodeDto } from '../../api'
import { Tree } from '../../types'

/**
 * Function takes nodes, apply coloring "layer" and convert them to tree structure.
 */
export const arrangeNodes = (nodes: NodeDto[]): Tree[] => {
  const coloredNodes = applyColoring(nodes)
  return nodesListToTree(coloredNodes)
}

/**
 * Useful function to return all children and their children etc. of given node. Basically it should return all nodes that are under given node.
 */
export const getAllChildren = (node: NodeDto, nodes: NodeDto[]): NodeDto[] => {
  return []
}

/**
 * Apply coloring to nodes. Node can have its own color, otherwise it should be colored with the same color as its parent.
 *  - If parent doesn't have color, node should be colored with the same color as its grandparent etc.
 *  - If any of parents doesn't have color, node isn't colored.
 */
const applyColoring = (nodes: NodeDto[]): NodeDto[] => {
  return []
}

/**
 * Convert flat nodes list to tree structure, so every node will have its direct children.
 */
const nodesListToTree = (nodes: NodeDto[]): Tree[] => {
  const tree: Tree[] = []
  return tree
}
