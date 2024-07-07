import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import type { RootState, AppDispatch } from './store'
import moment from 'moment'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useLocalTime = utcDateTime => {
  const [localDateTime, setLocalDateTime] = useState(
    moment.utc(utcDateTime).local().format('HH:mm:ss'),
  )

  useEffect(() => {
    setLocalDateTime(moment.utc(utcDateTime).local().format('HH:mm:ss'))
  }, [utcDateTime])

  return localDateTime
}

export const useScrollToBottom = messagesData => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messagesData])

  return chatContainerRef
}
