import { Typography } from '@mui/material'
import { getUserInfo, getNodes } from '../../code/hooks/useApi'
import styled from 'styled-components'
import { useState } from 'react'
import MapTile from './MapTile'

/**
 * This Map component renders whole map (their nodes) - see readme for better visual imagination.
 * Basically, it renders all nodes and handle saving.
 */
export default function Map() {
  const [isEditingId, setIsEditingId] = useState<number | undefined>(undefined)

  const userInfo = getUserInfo()
  const nodesData = getNodes()

  const username = userInfo.isLoading ? 'Loading...' : userInfo.data?.username

  if (nodesData.isLoading) {
    return <>Loading...</>
  }

  const nodes = nodesData.data?.nodes

  const firstNode = nodes?.filter((n) => n.id === 1)[0]

  if (firstNode === undefined) {
    return <>No nodes</>
  }

  return (
    <Wrap>
      <Typography variant='h5'>🤗 Wonderful nodes 🚀</Typography>

      <Typography variant='h6'>
        Welcome <b>{username}</b>
      </Typography>

      {/* <Button>Save map</Button> NOT NEEDED */}

      <NodesWrap>
        {firstNode && (
          <MapTile
            color={firstNode.color}
            setIsEditingId={setIsEditingId}
            isEditingId={isEditingId}
            id={firstNode.id}
          />
        )}
      </NodesWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-top: 50px;
`

const NodesWrap = styled.div`
  width: 100%;
  display: flex;
`
