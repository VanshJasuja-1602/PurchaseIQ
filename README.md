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

## 🔒 Production Security Disclosure

> [!WARNING]
> This application uses `VITE_DATABRICKS_TOKEN` directly in the browser configuration for demonstration and testing.
> **For production deployments, do not expose API tokens in client-side bundles.**
> Implement a backend proxy server to forward requests and inject authentication headers server-side.

---

## 💻 Quick Start

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
VITE_DATABRICKS_TOKEN=your_databricks_token_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates clean, production-ready static assets in the `/dist` folder.
