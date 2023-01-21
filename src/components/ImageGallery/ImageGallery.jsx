export function ImageGallery({ images }) {
  return (
    <ul>
      {images.map(({ previewURL, id, tags }) => (
        <li key={id}>
          {' '}
          <img src={previewURL} alt={tags} />
        </li>
      ))}
    </ul>
  );
}
