import pytest
import sys
sys.path.insert(0, '../ml')

from models.risk_scorer import RiskScorer
from models.root_cause_classifier import RootCauseClassifier
from models.severity_grader import SeverityGrader

def test_risk_scorer():
    """Test risk scorer predictions"""
    scorer = RiskScorer()
    risk = scorer.predict_risk(80, 3.0, 25, 0.3)
    assert 0 <= risk <= 1

def test_root_cause_classifier():
    """Test root cause classification"""
    classifier = RootCauseClassifier()
    cause = classifier.classify(90, 2.0, 15, 0.2)
    assert cause in classifier.get_all_causes()

def test_severity_grader():
    """Test severity grading"""
    grader = SeverityGrader()
    severity = grader.grade_severity(0.7, 90, 3.0)
    assert severity in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
