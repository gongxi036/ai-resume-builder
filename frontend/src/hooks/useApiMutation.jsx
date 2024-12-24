import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

export default function useApiMutation(
  url,
  { method, contentType },
  successCallback,
  errorCallback
) {
  const { toast } = useToast()
  return useMutation({
    mutationFn: async requestData => {
      try {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': contentType
          },
          body: JSON.stringify(requestData)
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        if (!res.ok) {
          console.log('res is not ok')
          throw new Error('Failed to update resume')
        }
        return data
      } catch (error) {
        console.log('error', error)
        throw new Error(error)
      }
    },
    onSuccess: () => {
      if (successCallback) {
        successCallback()
      } else {
        toast({
          title: 'Resume updated successfully',
          variant: 'default'
        })
      }
    },
    onError: (error) => {
      console.log('onerror', error)
      if (errorCallback) {
        errorCallback(error)
      } else {
        toast({
          title: 'Failed to update resume',
          variant: 'destructive'
        })
      }
    }
  })
}
