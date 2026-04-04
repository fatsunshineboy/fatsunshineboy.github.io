<template>
  <div class="chiral-network" ref="networkContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true
  },
  nodeCount: {
    type: Number,
    default: 9
  }
})

const networkContainer = ref(null)

function initChiralNetwork() {
  if (!networkContainer.value || !props.enabled) return

  const nodes = []
  const positions = [
    { top: '15%', left: '10%' }, { top: '25%', left: '30%' },
    { top: '35%', left: '60%' }, { top: '20%', left: '80%' },
    { top: '50%', left: '20%' }, { top: '60%', left: '50%' },
    { top: '45%', left: '75%' }, { top: '75%', left: '35%' },
    { top: '80%', left: '65%' }
  ]

  // 创建节点
  positions.forEach((pos, i) => {
    const node = document.createElement('div')
    node.className = 'chiral-node'
    node.style.top = pos.top
    node.style.left = pos.left
    node.style.animationDelay = i * 0.3 + 's'
    networkContainer.value.appendChild(node)
    nodes.push({ element: node, ...pos })
  })

  // 创建连接线
  const links = [[0,1],[1,3],[1,4],[2,3],[2,6],[4,5],[5,7],[6,8],[7,8]]
  links.forEach(([from, to]) => {
    const fromNode = nodes[from]
    const toNode = nodes[to]
    const x1 = parseFloat(fromNode.left)
    const y1 = parseFloat(fromNode.top)
    const x2 = parseFloat(toNode.left)
    const y2 = parseFloat(toNode.top)
    const length = Math.sqrt((x2-x1)**2 + (y2-y1)**2)
    const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI

    const link = document.createElement('div')
    link.className = 'chiral-link'
    link.style.width = length + '%'
    link.style.left = fromNode.left
    link.style.top = fromNode.top
    link.style.transform = `rotate(${angle}deg)`
    link.style.transformOrigin = '0 0'
    networkContainer.value.appendChild(link)
  })
}

onMounted(() => {
  initChiralNetwork()
})

onUnmounted(() => {
  if (networkContainer.value) {
    networkContainer.value.innerHTML = ''
  }
})
</script>

<style scoped>
.chiral-network {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--z-base);
}

.chiral-node {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--accent-primary);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--accent-primary);
  animation: chiral-pulse 3s ease-in-out infinite;
}

@keyframes chiral-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.chiral-link {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(196, 163, 90, 0.15), transparent);
  animation: chiral-flow 4s ease-in-out infinite;
}

@keyframes chiral-flow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
</style>
