<template>
    <div class="tooltip">
      <div class="tooltip-title">{{ formatDate(date) }}</div>
      <div class="tooltip-row">
        <span>Total Sales:</span>
        <span>${{ formatNumber(fbaAmount + fbmAmount) }}</span>
      </div>
      <div class="tooltip-row">
        <span>FBA Sales:</span>
        <span>${{ formatNumber(fbaAmount) }}</span>
      </div>
      <div class="tooltip-row">
        <span>FBM Sales:</span>
        <span>${{ formatNumber(fbmAmount) }}</span>
      </div>
      <div class="tooltip-row">
        <span>Shipping:</span>
        <span>${{ formatNumber(shippingAmount) }}</span>
      </div>
      <div class="tooltip-row">
        <span>Profit:</span>
        <span>${{ formatNumber(profit) }}</span>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props: {
      date: {
        type: String,
        required: true
      },
      fbaAmount: {
        type: Number,
        required: true
      },
      fbmAmount: {
        type: Number,
        required: true
      },
      shippingAmount: {
        type: Number,
        required: true
      },
      profit: {
        type: Number,
        required: true
      }
    },
  
    setup() {
      const formatDate = (dateStr: string) => {
        try {
          const date = new Date(dateStr)
          return date.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric' 
          })
        } catch (e) {
          return dateStr
        }
      }
  
      const formatNumber = (num: number) => {
        return num.toLocaleString('en-US', { 
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
  
      return {
        formatDate,
        formatNumber
      }
    }
  })
  </script>
  
  <style scoped>
  .tooltip {
    display: none;
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    min-width: 200px;
  }
  
  .tooltip-title {
    font-weight: bold;
    padding-bottom: 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
  }
  
  .tooltip-row {
    display: flex;
    justify-content: space-between;
    padding: 2px 0;
  }
  
  .tooltip-row span:first-child {
    margin-right: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
  </style>