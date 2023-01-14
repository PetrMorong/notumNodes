import { Button, TextField } from '@mui/material'
import styled from 'styled-components'
import { getNodes, saveNodesApi, queryClient } from '../../code/hooks/useApi'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

/**
 * Component for displaying actions for a single tile on the map. The user can:
 *  - delete node and all its children
 *  - add a new child to the node (optionally he can enter some description)
 *      -  ID of new node is incremented automatically (e.g. if the latest node has ID 1, the new node will have ID 2)
 *  - change color of the node
 */

interface Props {
  id: number
}

export default function MapTileActions({ id }: Props) {
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('')
  const nodesData = getNodes()
  const nodes = nodesData.data?.nodes

  const saveNodesMutation = useMutation({
    mutationFn: saveNodesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] })
    },
  })

  if (nodes === undefined) {
    return null
  }

  const handleDelete = () => {
    const nodesToSave = nodes.filter((n) => n.id !== id).filter((n) => n.parentId !== id)
    saveNodesMutation.mutate({ NodesDto: { nodes: nodesToSave || [] } })
  }

  const handleAdd = () => {
    const nodeToAdd = {
      color: undefined,
      description,
      id: nodes[nodes.length - 1].id + 1, // last item id + 1
      parentId: id,
    }
    saveNodesMutation.mutate({ NodesDto: { nodes: [...nodes, nodeToAdd] } })
    setDescription('')
  }

  const handleColorize = () => {
    const node = nodes.find((n) => n.id === id)
    if (node) {
      const index = nodes.indexOf(node)
      const newArray = nodes
      newArray[index] = { ...node, color }
      saveNodesMutation.mutate({ NodesDto: { nodes: newArray } })
      setColor('')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  return (
    <>
      <Button variant='contained' size='small' onClick={handleDelete}>
        Delete
      </Button>

      <Flex>
        <TextField
          label='Description'
          variant='outlined'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant='contained' size='small' onClick={handleAdd}>
          Create
        </Button>
      </Flex>
      <Flex>
        <TextField label='Color' variant='outlined' value={color} onChange={(e) => setColor(e.target.value)} />
        <Button variant='contained' size='small' onClick={handleColorize}>
          Colorize
        </Button>
      </Flex>
    </>
  )
}

const Flex = styled.div`
  display: flex;
`
