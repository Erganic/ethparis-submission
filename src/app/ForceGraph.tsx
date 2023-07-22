'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import SpriteText from 'three-spritetext'
import * as THREE from 'three'
import { ethers } from 'ethers'
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d'
import { abi as EAS } from '@ethereum-attestation-service/eas-contracts/artifacts/contracts/EAS.sol/EAS.json'
import NodePopup from '../Components/NodePopup'

export default function ForceGraph() {
  const rpc = 'https://sepolia.infura.io/v3/60becffe08954e0dbd3de782bfe31d8e'
  const provider = new ethers.providers.StaticJsonRpcProvider(rpc)
  const eas = new ethers.Contract('0xC2679fBD37d54388Ce493F1DB75320D236e1815e', EAS, provider)

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const schema = '0x9ab3b6006c32f73b4993c5ca330403c802f52745ecc58eecd0869db7c2b2810c'
  const [graph, setGraph] = useState({ nodes: [], links: [] })
  const { refetch } = useQuery(
    gql`
      query Query($where: AttestationWhereInput) {
        attestations(where: $where) {
          id
          schemaId
          attester
          recipient
          refUID
          decodedDataJson
        }
      }
    `,
    {
      variables: {
        where: {
          schemaId: {
            equals: schema,
          },
          revoked: {
            equals: false,
          }
        }
      },
      onCompleted: async (data) => {
        const attestations = data.attestations
          .map((attestation: any) => {
            return {
              ...attestation,
              decodedDataJson: JSON.parse(attestation.decodedDataJson),
            }
          })
          .filter((attestation: any) => {
            return attestation.decodedDataJson[0].value.value = true
          })

        const addresses: Set<string> = attestations
          .reduce(
            (acc: Set<string>, attestation: any) => {
              acc.add(attestation.reciatpient)
              acc.add(attestation.attester)
              return acc
            }, new Set()
          )

        setGraph({
          nodes: [
            ...Array.from(addresses).map((address: string) => {
              const correspondingAttestation = attestations.find((attestation: any) => attestation.recipient === address || attestation.attester === address);
              const attestationId = correspondingAttestation ? correspondingAttestation.id : null;

              return {
                id: address,
                name: address,
                attestationId: attestationId,
                type: 'address'
              }
            }),
          ] as any,
          links: [
            ...attestations.map((attestation: any) => {
              return {
                source: attestation.attester,
                target: attestation.recepiet,
                type: attestation.schemaId,
              }
            }),
          ] as any,
        })
      }
    },
  )

  // Refetch on new attestations.
  useEffect(() => {
    // Add listener and remove it, idk what the rules are.
    const listener = () => { refetch() }
    eas.off('Attested', listener)
    eas.on('Attested', listener)
  }, [eas, refetch])

  // Load blockies.
  let blockies: any
  if (typeof document !== 'undefined') {
    blockies = require('ethereum-blockies')
  }

  // Generate one blockie to hack around a bug in the library.
  blockies?.create({ seed: 'fixies!' })

  // Open stuff on click.
  const handleClick = useCallback((node: any) => {
    if (node.type === 'address') {
      setSelectedNode(node)
      setIsPopupOpen(true)
    }
  }, [])

  return (
    <main>
      <ForceGraph3D
        graphData={graph}
        nodeAutoColorBy="type"
        linkAutoColorBy="type"
        linkWidth={0.2}
        linkOpacity={0.5}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={1}
        onNodeClick={handleClick}
        nodeThreeObject={(node: any) => {
          if (node.type === 'address') {
            const icon = blockies?.create({ seed: node.id })
            const data = icon?.toDataURL('image/png')
            const texture = new THREE.TextureLoader().load(data)
            texture.colorSpace = THREE.SRGBColorSpace
            const material = new THREE.SpriteMaterial({ map: texture })
            const sprite = new THREE.Sprite(material)
            sprite.scale.set(8, 8, 0)
            return sprite
          } else {
            const sprite = new SpriteText(node.name);
            sprite.color = node.color;
            sprite.textHeight = 4;
            return sprite;
          }
        }}
      />

        {/* Popup */}
          {isPopupOpen && selectedNode && (
          <div className="popup-overlay">
            <NodePopup
              node={selectedNode}
              attestationId={selectedNode.attestationId}
              onClose={() => setIsPopupOpen(false)} 
            />
          </div>
          )}
    </main>
  )
}
