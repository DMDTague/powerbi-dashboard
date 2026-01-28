import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, 
  AreaChart, Area 
} from 'recharts';
import { 
  Filter, ChevronDown, Download, Share2, 
  MoreVertical, Calendar, Info, RefreshCw 
} from 'lucide-react';

const PowerBIDashboard = () => {
  // Real data from Retail_and_wherehouse_Sale.csv
  const kpiData = [
    { label: 'Total Sales', value: '$1.03M', sub: 'YTD 2020', color: '#0078D4' },
    { label: 'Retail Sales', value: '$208.2K', sub: '20.2% of total', color: '#107C10' },
    { label: 'Warehouse Sales', value: '$822.9K', sub: '79.8% of total', color: '#5C2D91' },
    { label: 'Transactions', value: '30,001', sub: 'Total count', color: '#D83B01' }
  ];

  const monthlyTrend = [
    { month: 'Jan', retail: 74318, warehouse: 284114, total: 358432 },
    { month: 'Mar', retail: 34523, warehouse: 113305, total: 147828 },
    { month: 'Jul', retail: 94538, warehouse: 418094, total: 512632 },
    { month: 'Sep', retail: 4805, warehouse: 7416, total: 12221 }
  ];

  const itemTypeData = [
    { name: 'BEER', value: 756818.44, percent: 73.4 },
    { name: 'WINE', value: 179148.77, percent: 17.4 },
    { name: 'LIQUOR', value: 90539.75, percent: 8.8 },
    { name: 'NON-ALCOHOL', value: 9263.04, percent: 0.9 }
  ];

  const topSuppliers = [
    { name: 'CROWN IMPORTS', sales: 192434.62, share: 100 },
    { name: 'ANHEUSER BUSCH INC', sales: 147630.16, share: 77 },
    { name: 'MILLER BREWING COMPANY', sales: 133017.58, share: 69 },
    { name: 'HEINEKEN USA', sales: 97868.70, share: 51 },
    { name: 'BOSTON BEER CORPORATION', sales: 39069.03, share: 20 },
    { name: 'DIAGEO NORTH AMERICA INC', sales: 34647.90, share: 18 }
  ];

  const PBI_COLORS = ['#0078D4', '#107C10', '#5C2D91', '#D83B01', '#00B0F0', '#C00000'];

  return (
    <div style={{ 
      backgroundColor: '#F3F2F1', 
      minHeight: '100vh', 
      fontFamily: '"Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif' 
    }}>
      {/* Power BI Header Bar */}
      <div style={{ 
        backgroundColor: '#FFF', 
        borderBottom: '1px solid #D2D0CE', 
        padding: '8px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: '48px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#FFB900', padding: '6px 8px', borderRadius: '2px' }}>
            <span style={{ fontWeight: '900', fontSize: '14px', color: '#323130' }}>⚡ PBI</span>
          </div>
          <h1 style={{ fontSize: '14px', fontWeight: '400', color: '#323130', margin: 0 }}>
            Sales Report - <span style={{ fontWeight: '600' }}>Retail & Warehouse Performance 2020</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <RefreshCw size={16} color="#605E5C" style={{ cursor: 'pointer' }} />
          <Download size={16} color="#605E5C" style={{ cursor: 'pointer' }} />
          <Share2 size={16} color="#605E5C" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Main Canvas Area */}
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* KPI Ribbon */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {kpiData.map((kpi, i) => (
              <div key={i} style={{ 
                backgroundColor: '#FFF', 
                padding: '20px', 
                borderRadius: '2px', 
                boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
                borderLeft: `4px solid ${kpi.color}`,
                transition: 'all 0.2s ease'
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#605E5C', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  {kpi.label}
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '600', 
                  color: '#201F1E', 
                  margin: '8px 0 4px 0',
                  lineHeight: '1'
                }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '11px', color: '#A19F9D' }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
            {/* Sales Trend Area Chart */}
            <div style={{ 
              backgroundColor: '#FFF', 
              padding: '20px', 
              borderRadius: '2px', 
              boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', margin: 0, fontWeight: '600', color: '#201F1E' }}>
                  Monthly Sales Trend
                </h3>
                <MoreVertical size={16} color="#A19F9D" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="colorRetail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0078D4" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0078D4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorWarehouse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5C2D91" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#5C2D91" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDEBE9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      style={{ fontSize: '12px', fill: '#605E5C' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      style={{ fontSize: '12px', fill: '#605E5C' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        fontSize: '12px', 
                        border: 'none', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        borderRadius: '2px'
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="warehouse" 
                      stroke="#5C2D91" 
                      fill="url(#colorWarehouse)" 
                      strokeWidth={2.5} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="retail" 
                      stroke="#0078D4" 
                      fill="url(#colorRetail)" 
                      strokeWidth={2.5} 
                    />
                    <Legend 
                      iconType="circle" 
                      wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart */}
            <div style={{ 
              backgroundColor: '#FFF', 
              padding: '20px', 
              borderRadius: '2px', 
              boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', margin: 0, fontWeight: '600', color: '#201F1E' }}>
                  Sales by Item Type
                </h3>
                <MoreVertical size={16} color="#A19F9D" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={itemTypeData}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    >
                      {itemTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PBI_COLORS[index % PBI_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        fontSize: '12px', 
                        border: 'none', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        borderRadius: '2px'
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend 
                      layout="vertical" 
                      align="right" 
                      verticalAlign="middle" 
                      iconType="circle" 
                      wrapperStyle={{ fontSize: '11px' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 - Top Suppliers Bar Chart */}
          <div style={{ 
            backgroundColor: '#FFF', 
            padding: '20px', 
            borderRadius: '2px', 
            boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14px', margin: 0, fontWeight: '600', color: '#201F1E' }}>
                Top Suppliers by Sales Volume
              </h3>
              <MoreVertical size={16} color="#A19F9D" style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSuppliers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDEBE9" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: '11px', fill: '#605E5C' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: '11px', fill: '#201F1E' }}
                    width={180}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: '12px', 
                      border: 'none', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      borderRadius: '2px'
                    }}
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Bar dataKey="sales" fill="#5C2D91" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Supplier Performance Table - Power BI Matrix Style */}
          <div style={{ 
            backgroundColor: '#FFF', 
            padding: '20px', 
            borderRadius: '2px', 
            boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)'
          }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 16px 0', fontWeight: '600', color: '#201F1E' }}>
              Supplier Performance Matrix
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #EDEBE9' }}>
                  <th style={{ padding: '12px 8px', color: '#605E5C', fontWeight: '600' }}>Supplier Name</th>
                  <th style={{ padding: '12px 8px', color: '#605E5C', fontWeight: '600', textAlign: 'right' }}>Total Sales</th>
                  <th style={{ padding: '12px 8px', color: '#605E5C', fontWeight: '600', textAlign: 'right' }}>Market Share</th>
                  <th style={{ padding: '12px 8px', color: '#605E5C', fontWeight: '600', textAlign: 'left', width: '220px' }}>Performance Index</th>
                </tr>
              </thead>
              <tbody>
                {topSuppliers.map((sup, i) => (
                  <tr key={i} style={{ 
                    borderBottom: '1px solid #F3F2F1',
                    backgroundColor: i % 2 === 0 ? '#FFF' : '#FAF9F8'
                  }}>
                    <td style={{ padding: '14px 8px', color: '#201F1E' }}>{sup.name}</td>
                    <td style={{ padding: '14px 8px', textAlign: 'right', fontWeight: '600', color: '#201F1E' }}>
                      ${sup.sales.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 8px', textAlign: 'right', color: '#605E5C' }}>
                      {(sup.sales / 1031117.87 * 100).toFixed(1)}%
                    </td>
                    <td style={{ padding: '14px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          flex: 1,
                          height: '20px', 
                          backgroundColor: '#F3F2F1',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            width: `${sup.share}%`, 
                            height: '100%', 
                            backgroundColor: i === 0 ? '#107C10' : '#0078D4',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                        <span style={{ fontSize: '11px', color: '#605E5C', minWidth: '35px' }}>
                          {sup.share}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Filter Sidebar (Classic Power BI) */}
        <div style={{ 
          width: '280px', 
          backgroundColor: '#FFF', 
          borderLeft: '1px solid #D2D0CE',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={20} color="#0078D4" strokeWidth={2.5} />
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#201F1E' }}>Filters</span>
          </div>

          {[
            { label: 'Year', value: '2020' },
            { label: 'Month', value: 'All' },
            { label: 'Item Type', value: 'All' },
            { label: 'Supplier', value: 'All' },
            { label: 'Sales Channel', value: 'All' }
          ].map((f, i) => (
            <div key={i}>
              <div style={{ 
                fontSize: '12px', 
                color: '#605E5C', 
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                {f.label}
              </div>
              <div style={{ 
                border: '1px solid #D2D0CE', 
                padding: '8px 12px', 
                fontSize: '13px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FAF9F8',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <span style={{ color: '#201F1E' }}>{f.value}</span>
                <ChevronDown size={14} color="#605E5C" />
              </div>
            </div>
          ))}

          <button style={{
            padding: '10px 16px',
            backgroundColor: '#0078D4',
            color: 'white',
            border: 'none',
            borderRadius: '2px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '10px'
          }}>
            Apply Filters
          </button>

          <div style={{ 
            marginTop: 'auto', 
            padding: '16px', 
            backgroundColor: '#F3F2F1', 
            borderRadius: '2px',
            fontSize: '11px',
            color: '#605E5C'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Info size={14} color="#0078D4" />
              <span style={{ fontWeight: '600', color: '#201F1E' }}>Data Source</span>
            </div>
            <div style={{ lineHeight: '1.5' }}>
              Retail_and_wherehouse_Sale.csv
              <br />
              Last updated: Jan 2020
              <br />
              Records: 30,001
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIDashboard;