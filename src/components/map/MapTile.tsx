import styled from 'styled-components'
import { getNodes } from '../../code/hooks/useApi'
import MapTileActions from './MapTileActions'

/**
 * Component for displaying a single tile on the map. Tile represents one node.
 *  - Content of tile contains node's ID followed by brackets with number of all children if it has some.
 *  - Background color is by default "white" but it should be overwritten by node's color property.
 *  - On tile click the node should become active. If the node is already active, it should become inactive.
 *  - If the tile is active, it has red border and we see its description and `<MapTileActions />` component.
 */

interface Props {
  isEditingId: number | undefined
  id: number
  color: string | undefined
  setIsEditingId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function MapTile({ id, isEditingId, setIsEditingId, color }: Props) {
  const nodesData = getNodes()
  const nodes = nodesData.data?.nodes

  const getChildren = (nodeId: number) => {
    return nodes?.filter((n) => n.parentId === nodeId)
  }

  if (nodes === undefined) {
    return null
  }

  const node = nodes.find((n) => n.id === id)

  const children = getChildren(id)

  return (
    <NodeWrap key={id}>
      <NodeItem onClick={() => setIsEditingId(id)} color={node?.color || color} key={id}>
        <span style={{ textAlign: 'center' }}>
          {id} {children?.length ? `(${children?.length})` : ''}
        </span>
        {isEditingId === id && <MapTileActions id={id} />}
      </NodeItem>
      <Flex>
        {children &&
          children?.map((child) => (
            <MapTile
              key={child.id}
              setIsEditingId={setIsEditingId}
              isEditingId={isEditingId}
              id={child.id}
              color={child.color || color}
            />
          ))}
      </Flex>
    </NodeWrap>
  )
}

const NodeWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Flex = styled.div`
  display: flex;
`

const NodeItem = styled.div<{ color: string | undefined }>`
  display: flex;
  border-radius: 5px;
  border: 2px solid grey;
  padding: 10px 7px;
  margin: 3px;
  cursor: pointer;
  align: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  ${(p) => {
    if (p.color) {
      return `background-color: ${p.color};`
    }
  }};

  &:hover {
    opacity: 0.8;
  }
`
