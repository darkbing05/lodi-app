import Image from 'next/image'

interface CategoryCardProps {
  genre: string
}

export default function CategoryCard({ genre }: CategoryCardProps) {
  const genreArtworkMap: { [key: string]: string } = {
    'All Music': 'https://picsum.photos/200',
    'Pop': 'https://picsum.photos/200',
    'Hip Hop': 'https://picsum.photos/200',
    'Rock': 'https://picsum.photos/200',
    'R&B/Soul': 'https://picsum.photos/200',
    'Country': 'https://picsum.photos/200',
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 relative">
      <Image src={genreArtworkMap[genre] || 'https://picsum.photos/200'} alt={genre} width={200} height={200} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="mt-2">
        <h3 className="text-lg font-bold text-gray-800">{genre}</h3>
        <p className="text-gray-600">Top 50</p>
        <button className="absolute bottom-2 right-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Play</button>
      </div>
    </div>
  )
}
