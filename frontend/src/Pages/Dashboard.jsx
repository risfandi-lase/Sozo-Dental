import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import user from "../assets/user.jpg";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AddPatientModal from "../Components/AddPatientModal";

const Dashboard = () => {
  // State for tracking selected time periods for each chart
  const [cashflowPeriod, setCashflowPeriod] = useState("12");
  const [expensesPeriod, setExpensesPeriod] = useState("12");
  const [incomePeriod, setIncomePeriod] = useState("12");

  // Mock data for different time periods - Cashflow
  const cashflowData = {
    "12": {
      data: [
        { month: "Jan", amount: 8000 },
        { month: "Feb", amount: 7500 },
        { month: "Mar", amount: 9200 },
        { month: "Apr", amount: 8800 },
        { month: "May", amount: 10500 },
        { month: "Jun", amount: 11200 },
        { month: "Jul", amount: 10800 },
        { month: "Aug", amount: 12400 },
        { month: "Sep", amount: 11800 },
        { month: "Oct", amount: 13200 },
        { month: "Nov", amount: 12800 },
        { month: "Dec", amount: 13232 },
      ],
      total: "730.232k",
      growth: "4.3%"
    },
    "6": {
      data: [
        { month: "Jul", amount: 10800 },
        { month: "Aug", amount: 12400 },
        { month: "Sep", amount: 11800 },
        { month: "Oct", amount: 13200 },
        { month: "Nov", amount: 12800 },
        { month: "Dec", amount: 13232 },
      ],
      total: "385.232k",
      growth: "6.8%"
    },
    "3": {
      data: [
        { month: "Oct", amount: 13200 },
        { month: "Nov", amount: 12800 },
        { month: "Dec", amount: 13232 },
      ],
      total: "192.232k",
      growth: "2.1%"
    }
  };

  // Mock data for expenses pie chart
  const expensesData = {
    "12": {
      data: [
        { name: "Internet", value: 65, color: "#8884d8" },
        { name: "Electricity", value: 26, color: "#82ca9d" },
        { name: "Transactions", value: 22, color: "#ffc658" },
        { name: "Rental Cost", value: 8, color: "#ff7300" },
        { name: "Foods", value: 3, color: "#00ff88" },
        { name: "Other", value: 2, color: "#ff8042" },
      ],
      total: "132.340k"
    },
    "6": {
      data: [
        { name: "Internet", value: 58, color: "#8884d8" },
        { name: "Electricity", value: 30, color: "#82ca9d" },
        { name: "Transactions", value: 25, color: "#ffc658" },
        { name: "Rental Cost", value: 12, color: "#ff7300" },
        { name: "Foods", value: 5, color: "#00ff88" },
        { name: "Other", value: 4, color: "#ff8042" },
      ],
      total: "78.520k"
    },
    "3": {
      data: [
        { name: "Internet", value: 45, color: "#8884d8" },
        { name: "Electricity", value: 35, color: "#82ca9d" },
        { name: "Transactions", value: 28, color: "#ffc658" },
        { name: "Rental Cost", value: 15, color: "#ff7300" },
        { name: "Foods", value: 8, color: "#00ff88" },
        { name: "Other", value: 6, color: "#ff8042" },
      ],
      total: "42.180k"
    }
  };

  // Mock data for income vs expenses
  const incomeExpenseData = {
    "12": {
      data: [
        { month: "Jan", income: 1200, expenses: 800 },
        { month: "Feb", income: 1100, expenses: 900 },
        { month: "Mar", income: 1400, expenses: 750 },
        { month: "Apr", income: 1300, expenses: 850 },
        { month: "May", income: 1500, expenses: 920 },
        { month: "Jun", income: 1350, expenses: 800 },
        { month: "Jul", income: 1450, expenses: 880 },
        { month: "Aug", income: 1600, expenses: 950 },
        { month: "Sep", income: 1380, expenses: 820 },
        { month: "Oct", income: 1520, expenses: 890 },
        { month: "Nov", income: 1440, expenses: 860 },
        { month: "Dec", income: 1580, expenses: 920 },
      ],
      totalIncome: "1.712k",
      incomeGrowth: "4.3%",
      totalExpenses: "1.012k",
      expensesGrowth: "9.6%"
    },
    "6": {
      data: [
        { month: "Jul", income: 1450, expenses: 880 },
        { month: "Aug", income: 1600, expenses: 950 },
        { month: "Sep", income: 1380, expenses: 820 },
        { month: "Oct", income: 1520, expenses: 890 },
        { month: "Nov", income: 1440, expenses: 860 },
        { month: "Dec", income: 1580, expenses: 920 },
      ],
      totalIncome: "8.970k",
      incomeGrowth: "5.8%",
      totalExpenses: "5.320k",
      expensesGrowth: "7.2%"
    },
    "3": {
      data: [
        { month: "Oct", income: 1520, expenses: 890 },
        { month: "Nov", income: 1440, expenses: 860 },
        { month: "Dec", income: 1580, expenses: 920 },
      ],
      totalIncome: "4.540k",
      incomeGrowth: "3.1%",
      totalExpenses: "2.670k",
      expensesGrowth: "4.8%"
    }
  };

  // Sample data for treatments with ratings (static for now)
  const treatmentData = [
    { name: "Scaling Teeth", rating: 4.7, maxRating: 5 },
    { name: "Tooth Extraction", rating: 4.4, maxRating: 5 },
    { name: "General Checkup", rating: 4.6, maxRating: 5 },
    { name: "Braces Installation", rating: 4.3, maxRating: 5 },
  ];

  // Sample data for stock availability (static for now)
  const stockData = [
    {
      item: "Dental Brush",
      status: "Low Stock",
      quantity: 5,
      total: 20,
      color: "#ff4444",
    },
    {
      item: "ChainTrim Regular",
      status: "Low Stock",
      quantity: 2,
      total: 15,
      color: "#ff4444",
    },
    {
      item: "Handglove",
      status: "Low Stock",
      quantity: 20,
      total: 50,
      color: "#ffc500",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderStars = (rating, maxRating) => {
    return (
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {rating}
        </span>
      </div>
    );
  };

  // Get current data based on selected periods
  const currentCashflowData = cashflowData[cashflowPeriod];
  const currentExpensesData = expensesData[expensesPeriod];
  const currentIncomeExpenseData = incomeExpenseData[incomePeriod];

  return (
    <div className="font-figtree w-full h-screen flex flex-col">
                          <AddPatientModal/>

      {/* Fixed Header */}
      <div className="flex items-center justify-between px-16 py-2 flex-shrink-0 bg-white">
        <p className="text-3xl font-[600]">Dashboard</p>

        <div className="flex items-center gap-4">
          <div>
            <label className="input w-90 font-figtree">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="Search for anything here..."
              />
            </label>
          </div>

          <div className="flex items-center gap-1">
            <span title="Language" className="cursor-pointer">
              <Icon
                icon="material-symbols:language"
                width="25"
                style={{ color: "#ccc" }}
              />
            </span>
            <span className="text-gray-400">EN</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer">
            <span title="Help">
              <Icon
                icon="material-symbols:help-outline"
                width="25"
                style={{ color: "#ccc" }}
              />
            </span>
            <span title="Performance">
              <Icon
                icon="mingcute:performance-line"
                width="25"
                style={{ color: "#ccc" }}
              />
            </span>
            <span title="Settings">
              <Icon
                icon="simple-line-icons:settings"
                width="22"
                style={{ color: "#ccc" }}
              />
            </span>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <Icon
              icon="guidance:calendar"
              width="24"
              style={{ color: "#ccc" }}
            />
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <img
              src={user}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p>Stephanie Darrel</p>
              <p className="text-xs text-gray-400 ">Orthopedic</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />

    
      {/* Scrollable Content Area */}
      <div className="flex-1 px-16 overflow-y-auto">
          <div className=" my-6 ">
        <p className="font-semibold">Good Morning, dr Darrel!</p>
        <p className="text-gray-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
        <div className="min-h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Cashflow Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                    Cashflow
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    Rp {currentCashflowData.total}
                  </p>
                  <p className="text-sm text-green-600">↗ {currentCashflowData.growth}</p>
                </div>
                <select 
                  className="select w-40 text-sm text-gray-500"
                  value={cashflowPeriod}
                  onChange={(e) => setCashflowPeriod(e.target.value)}
                >
                  <option value="12">Last 12 months</option>
                  <option value="6">Last 6 months</option>
                  <option value="3">Last 3 months</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={currentCashflowData.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="#6366f1"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Expenses Donut Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                  Expenses
                </h3>
                <select 
                  className="select w-40 text-sm text-gray-500"
                  value={expensesPeriod}
                  onChange={(e) => setExpensesPeriod(e.target.value)}
                >
                  <option value="12">Last 12 months</option>
                  <option value="6">Last 6 months</option>
                  <option value="3">Last 3 months</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative">
                  <ResponsiveContainer width={150} height={150}>
                    <PieChart>
                      <Pie
                        data={currentExpensesData.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {currentExpensesData.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">TOTAL</p>
                      <p className="text-md font-bold">Rp {currentExpensesData.total}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 ml-6">
                  {currentExpensesData.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Income & Expense Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                  Income & Expense
                </h3>
                <select 
                  className="select w-40 text-sm text-gray-500"
                  value={incomePeriod}
                  onChange={(e) => setIncomePeriod(e.target.value)}
                >
                  <option value="12">Last 12 months</option>
                  <option value="6">Last 6 months</option>
                  <option value="3">Last 3 months</option>
                </select>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">TOTAL INCOME</p>
                  <p className="text-xl font-bold text-green-600">
                    Rp {currentIncomeExpenseData.totalIncome}{" "}
                    <span className="text-sm text-green-500">↗ {currentIncomeExpenseData.incomeGrowth}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">TOTAL EXPENSES</p>
                  <p className="text-xl font-bold text-red-600">
                    Rp {currentIncomeExpenseData.totalExpenses}{" "}
                    <span className="text-sm text-red-500">↗ {currentIncomeExpenseData.expensesGrowth}</span>
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={currentIncomeExpenseData.data} barGap={5}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="income" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar
                    dataKey="expenses"
                    fill="#f59e0b"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 4. Popular Treatment & Stock Status */}
            <div className="space-y-6">
              {/* Popular Treatment */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                  Popular Treatment
                </h3>
                <div className="space-y-4">
                  {treatmentData.map((treatment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-700">
                        {treatment.name}
                      </span>
                      {renderStars(treatment.rating, treatment.maxRating)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Availability */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                    Stock Availability
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View all
                  </button>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>TOTAL ASSET</span>
                  <span>TOTAL PRODUCT</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Rp 531.000k</span>
                  <span>442</span>
                </div>
                <div className="flex items-center space-x-4 mb-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                    <span>Low Stock</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                    <span>Out of stock</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {stockData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">
                          {item.item}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-semibold">
                            Qty {item.quantity}
                          </span>
                          <button className="text-xs text-blue-600 hover:text-blue-800 ml-2">
                            Order
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(item.quantity / item.total) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;