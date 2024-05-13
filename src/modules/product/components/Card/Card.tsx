import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  price: number;
  image: string;
};

const Card = ({ image, title, description, price }: CardProps) => {
  return (
    <div className='card shadow-sm h-100 p-2 border-0 d-flex flex-column justify-content-between product-card'>
      <div>
        <div className='position-relative' style={{ height: 200 }}>
          <Image
            src={image}
            fill
            priority
            alt=''
            sizes={'(min-width: 80px) 100%'}
            style={{
              objectFit: 'contain',
              placeSelf: 'center',
            }}
          />
        </div>
        <div className='pt-2'>
          <h6>{title}</h6>
          <p className='fs-6 fw-light'>{description}</p>
        </div>
      </div>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Card;
