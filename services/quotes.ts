export const loadQuotes = async (request_url: string): Promise<any[]> => {

  console.log( request_url );

  try {
    const response = await fetch(request_url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка', error)
    return []
  }
}

export const loadRandomQuotes = async (): Promise<any[]> => {
  return loadQuotes('https://frases.vencen.beget.tech/api/frases/random')
}

export const loadCategoryQuotes = async (
  categoryName: string,
): Promise<any[]> => {
  return loadQuotes(
    `https://frases.vencen.beget.tech/api/frases/category/${categoryName}`,
  )
}

export const loadTagQuotes = async (name: string): Promise<any[]> => {
  return loadQuotes(`https://frases.vencen.beget.tech/api/frases/tag/${name}`)
}

export const loadAuthorQuotes = async (name: string): Promise<any[]> => {
  return loadQuotes(
    `https://frases.vencen.beget.tech/api/frases/author/${name}`,
  )
}

export const voteQuote = async (
  quoteId: string,
  vote: number,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://frases.vencen.beget.tech/api/frases/vote/${quoteId}/` +
        (vote > 0 ? 'up' : 'down'),
      // {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // },
    )
    if (!response.ok) {
      throw new Error('Ошибка при голосовании за цитату')
    }
  } catch (error) {
    console.error('Ошибка при голосовании за цитату:', error)
  }
}

export const fetchQuoteById = async (quoteId: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://frases.vencen.beget.tech/api/frases/id/${quoteId}`,
    )
    if (!response.ok) {
      throw new Error('Ошибка при загрузке цитаты')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка при загрузке цитаты:', error)
  }
}
