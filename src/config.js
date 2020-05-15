const isTest = !!process.env.TEST;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;

export default {
    isTest,
    isProduction,
    port,
};