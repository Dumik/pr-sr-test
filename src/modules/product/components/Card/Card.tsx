import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  price: number;
  image: string;
};

const Card = ({ image, title, description, price }: CardProps) => {
  return (
    <div className='card shadow-sm h-100 p-2'>
      {/* <Image
        src={image}
        width={200}
        height={200}
        alt=''
        className='w-auto object-fit-cover rounded-1'
        style={{ maxHeight: 300, width: 'auto' }}
      /> */}
      <Image
        src={image}
        width='0'
        height='0'
        sizes='100vw'
        style={{ width: '100%', height: 'auto', maxHeight: 200, objectFit: 'cover' }}
        priority
        alt=''
      />
      <div className='pt-2'>
        <h6>{title}</h6>
        <p className='fs-6'>{description}</p>
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};

export default Card;
