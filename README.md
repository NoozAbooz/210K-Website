## Site made for VEX V5 team 210K

To self host, clone the repo and run:
```
npm i
npm run dev
```

This site requires a robotevents.com API key. After applying for API access, make a file at `src/config/api_key.ts` with the following:
```
export const API_KEY = {
  TOKEN: 'API KEY HERE',
};
```
