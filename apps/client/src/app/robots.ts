import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: [
      '/api',
      '/classic/online',
      '/matrix/online',
      '/onlythree/online',
    ],
  },
});

export default robots;
