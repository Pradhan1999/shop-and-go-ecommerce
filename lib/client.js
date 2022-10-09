import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'qg88jpks',
    dataset: 'production',
    apiVersion: '2022-09-27',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);









// export const client = sanityClient({
//   projectId: 'vfxfwnaw',
//   dataset: 'production', //dataset for telling production or development k
//   apiVersion: '2022-03-10',
//   useCdn: true,
//   token: process.env.NEXT_PUBLIC_SANITY_TOKEN
// });

// const builder = imageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);