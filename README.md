# 🎯 Trivia Visualizer

A beautiful and interactive visualization tool for exploring trivia questions from the [Open Trivia Database API](https://opentdb.com).

## Features

- 📊 **Visual Statistics**: See distribution of questions by category and difficulty
- 🔍 **Category Filtering**: Filter questions by specific categories
- 📈 **Interactive Charts**: Beautiful bar and pie charts using Recharts
- 💎 **Clean UI**: Modern, responsive design with a gradient background
- ⚡ **Fast Loading**: Fetches 50+ diverse questions from multiple categories

## Technologies Used

- **React** with TypeScript
- **Recharts** for data visualization
- **Open Trivia DB API** for trivia data
- Functional components with React Hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trivia-visualizer.git
cd trivia-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **View All Questions**: By default, the app displays all fetched questions
2. **Explore Categories**: Browse the list of categories with question counts
3. **Filter by Category**: Click on any category to filter the visualizations
4. **Clear Filters**: Click "Clear Filter" to return to viewing all questions
5. **Interactive Charts**: Hover over chart elements for detailed information

## Project Structure

```
trivia-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CategoryChart.tsx       # Bar chart for category distribution
│   │   ├── CategoryList.tsx        # List of categories with filtering
│   │   ├── CategoryList.css
│   │   ├── DifficultyChart.tsx     # Pie chart for difficulty distribution
│   │   ├── StatsCards.tsx          # Statistics cards component
│   │   └── StatsCards.css
│   ├── services/
│   │   └── triviaApi.ts            # API service for fetching data
│   ├── App.tsx                     # Main application component
│   ├── App.css
│   ├── types.ts                    # TypeScript type definitions
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## API Reference

This project uses the [Open Trivia Database API](https://opentdb.com/api_config.php):

- `GET /api_category.php` - Fetch all available categories
- `GET /api.php?amount={n}&category={id}` - Fetch questions

## Features Implemented

✅ Display list of categories from the API  
✅ Show distribution of questions by category (Bar Chart)  
✅ Show distribution of questions by difficulty (Pie Chart)  
✅ Filter data by single category  
✅ Use 50+ questions from the API  
✅ React functional components with hooks  
✅ Recharts library integration  
✅ Clean and user-friendly UI  

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Open Trivia Database](https://opentdb.com) for providing free trivia questions
- [Recharts](https://recharts.org) for the excellent charting library
