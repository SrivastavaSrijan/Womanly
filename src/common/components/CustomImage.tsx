import React from 'react';
import Image from 'next/image';

interface ICustomImage {
  path: string;
  classNames?: string;
  size?: number;
}

function CustomImage({ path, classNames, size }: ICustomImage) {
  return (
    <div className="image-container">
      <Image
        src={path}
        layout={size ? 'fixed' : 'fill'}
        className={`image ${classNames}`}
        {...(size && { width: size, height: size })}
      />
    </div>
  );
}

CustomImage.defaultProps = {
  classNames: '',
  size: undefined,
};
export default CustomImage;
