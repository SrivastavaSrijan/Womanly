import React from 'react';
import Image from 'next/image';

interface CustomImage {
  path: string;
  classNames?: string;
  size?: number;
}

const CustomImage: React.FC<CustomImage> = ({
  path,
  classNames,
  size = null
}) => {
  return (
    <div className={'image-container'}>
      <Image
        src={path}
        layout={size ? 'fixed' : 'fill'}
        className={`image ${classNames}`}
        {...(size && { width: size, height: size })}
      />
    </div>
  );
};

export default CustomImage;
