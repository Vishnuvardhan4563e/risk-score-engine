"""
Metrics calculation module
"""

def calculate_accuracy(y_true, y_pred):
    """Calculate accuracy"""
    correct = sum(y_true[i] == y_pred[i] for i in range(len(y_true)))
    return correct / len(y_true)

def calculate_precision(y_true, y_pred):
    """Calculate precision"""
    true_positives = sum(y_true[i] == y_pred[i] == 1 for i in range(len(y_true)))
    predicted_positives = sum(y_pred[i] == 1 for i in range(len(y_pred)))
    return true_positives / predicted_positives if predicted_positives > 0 else 0
