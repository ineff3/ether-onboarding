import { tokenPreviews } from '@/tokens'
import { TokenPreview, TokenTitle } from '@/types'

export const getTokenPreviewByTitle = (title: TokenTitle): TokenPreview => {
  return tokenPreviews.find((tokenPreview) => tokenPreview.title === title)!
}
