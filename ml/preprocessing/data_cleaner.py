"""
Data preprocessing and cleaning module
"""

import pandas as pd
import numpy as np

class DataCleaner:
    """Clean and preprocess raw sensor data"""
    
    def __init__(self):
        self.means = {}
        self.stds = {}
    
    def remove_outliers(self, data, threshold=3):
        """Remove outliers using z-score"""
        return data[abs((data - data.mean()) / data.std()) < threshold]
    
    def handle_missing_values(self, data, method='mean'):
        """Handle missing values"""
        if method == 'mean':
            return data.fillna(data.mean())
        elif method == 'forward_fill':
            return data.fillna(method='ffill')
        return data
    
    def normalize(self, data):
        """Normalize data to 0-1 range"""
        return (data - data.min()) / (data.max() - data.min())

cleaner = DataCleaner()
