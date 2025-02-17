import { ref, watch } from 'vue'

interface ButtonState {
  text: string
  type: string
  size: string
  clickCount: number
}

interface CardState {
  id: string
  likes: number
}

const STORAGE_KEY = 'editor-component-states'

const useComponentStates = () => {
  const buttonStates = ref(new Map<string, ButtonState>())
  const cardStates = ref(new Map<string, CardState>())

  const getButtonState = (text: string, type: string, size: string) => {
    const key = `${text}-${type}-${size}`
    return buttonStates.value.get(key) || {
      text,
      type,
      size,
      clickCount: 0
    }
  }

  const updateButtonState = (text: string, type: string, size: string, clickCount: number) => {
    const key = `${text}-${type}-${size}`
    buttonStates.value.set(key, {
      text,
      type,
      size,
      clickCount
    })
  }

  const getCardState = (id: string) => {
    return cardStates.value.get(id) || {
      id,
      likes: 0
    }
  }

  const updateCardState = (id: string, likes: number) => {
    cardStates.value.set(id, {
      id,
      likes
    })
  }

  return {
    getButtonState,
    updateButtonState,
    getCardState,
    updateCardState
  }
}

// 创建并导出一个全局实例
export const componentStates = useComponentStates()

// 同时导出 hook 以供其他地方使用
export default useComponentStates 