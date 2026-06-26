# PurchaseIQ - Real-time Shopper Purchase Prediction

PurchaseIQ is a premium, bright, and highly interactive AI SaaS platform designed to analyze e-commerce shopper behaviors and predict purchase completion likelihood in real-time. The frontend client processes session behavioral metrics, calculates engineered features, runs one-hot categories encoding, and executes inference on a deployed **Databricks Model Serving** endpoint.

## 🚀 Key Features

* **Three-Pillared Intuitive Input Dashboard**: Grouped inputs for Browsing Behavior, Engagement Signals, and Visitor Profile.
* **Live Feature Engineering Preview**: Reacts in real time to inputs to show calculated values (`TotalPages`, `TotalDuration`, `ProductFocusRatio`, `ProductTimeRatio`, `ExitBounceDiff`) and numeric `0/1` one-hot encoded categories before submitting.
* **Databricks Model Serving Integration**: Connects dynamically with Databricks endpoints using credential configurations loaded from environment files.
* **Dynamic Visualization Results**: Explodes success confetti for high purchase chance outcomes, displays circular probability gauges, and provides collapsible developer logs representing the exact payload exchange.
* **Responsive, Premium Aesthetics**: Sticky glass pill navigation, animated colorful gradient mesh background, custom spotlight mouse-hover tracker, and floating journey diagrams built with React, Tailwind CSS, and Framer Motion.

---

## 🛠️ Technology Stack

* **Core**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
* **Form & Validation**: React Hook Form, Zod Resolver
* **Animations**: Framer Motion, Lucide Icons
* **API Communication**: Axios
* **Toasts**: Sonner

---

## 📐 Mathematical Client-Side Logic

To feed the model its expected feature schema without complicating user interactions, PurchaseIQ performs feature engineering and encodings in the browser.

### 1. Feature Engineering
* **TotalPages** = `Administrative` + `Informational` + `ProductRelated`
* **TotalDuration** = `Administrative_Duration` + `Informational_Duration` + `ProductRelated_Duration`
* **ProductFocusRatio** = `ProductRelated / TotalPages` (Defaults to `0` if `TotalPages` is 0)
* **ProductTimeRatio** = `ProductRelated_Duration / ProductRelated` (Defaults to `0` if `ProductRelated` is 0)
* **ExitBounceDiff** = `ExitRates - BounceRates`

### 2. One-Hot Category Encoding (Numeric 0/1)
* **MonthDropdown** maps to 10 binary columns: `Month_Aug`, `Month_Dec`, `Month_Feb`, `Month_Jul`, `Month_June`, `Month_Mar`, `Month_May`, `Month_Nov`, `Month_Oct`, `Month_Sep`
* **VisitorTypeDropdown** maps to 3 binary columns: `VisitorType_New_Visitor`, `VisitorType_Other`, `VisitorType_Returning_Visitor`
* **WeekendToggle** is converted to a binary integer: `true = 1`, `false = 0`

---

## 🔒 Production Security & Proxying

To keep your Databricks API token strictly private and avoid browser CORS blocks, PurchaseIQ features **built-in production serverless functions** that act as secure backend proxies:

* **No Token Leakage**: The client browser calls `/api/predict` (a relative route) and does not need to download or handle the Databricks API token.
* **Server-side Injection**: The hosting platform runs a serverless function that retrieves the secret token from the server-side environment and appends the `Authorization` header securely before forwarding the request to Databricks.
* **Automatic Routing**: Setup is fully automated out-of-the-box for both **Vercel** and **Netlify**.

---

## 🌐 Deployment Instructions

### Option A: Deploying to Vercel
Vercel automatically detects the serverless function located in `api/predict.js`.
1. Push your repository to GitHub.
2. Import the project into your **Vercel Dashboard**.
3. Under **Project Settings** -> **Environment Variables**, add:
   * **Key**: `DATABRICKS_TOKEN` (or `VITE_DATABRICKS_TOKEN`)
   * **Value**: `<your_databricks_token>`
4. Click **Deploy**. Vercel will automatically build the React Vite app and map the `/api/predict` route to the proxy function.

### Option B: Deploying to Netlify
Netlify automatically routes incoming requests to `/api/predict` to the handler in `netlify/functions/predict.js` via the configuration in `netlify.toml`.
1. Push your repository to GitHub.
2. Link the repository to your **Netlify Dashboard**.
3. Under **Site configuration** -> **Environment variables**, add:
   * **Key**: `DATABRICKS_TOKEN` (or `VITE_DATABRICKS_TOKEN`)
   * **Value**: `<your_databricks_token>`
4. Deploy the site.

---

## 💻 Local Development

### Prerequisites
* Node.js (v18+)
* npm (v9+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory (based on `.env.example`):
```env
VITE_DATABRICKS_URL=/api/predict
VITE_DATABRICKS_TOKEN=<your_databricks_token>
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. The Vite dev server will use the proxy configuration in `vite.config.ts` to route requests to Databricks.

### 4. Build locally
To verify production builds:
```bash
npm run build
```
Generates clean, production-ready static assets in the `/dist` folder.
