class SeverityGrader:
    """
    Grades incident severity for prioritization
    """
    def __init__(self):
        self.severity_levels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    
    def grade_severity(self, risk_score, speed, acceleration):
        """
        Grade incident severity based on multiple factors
        
        Returns: Severity level (LOW, MEDIUM, HIGH, CRITICAL)
        """
        if risk_score < 0.3:
            return "LOW"
        elif risk_score < 0.6:
            return "MEDIUM"
        elif risk_score < 0.8:
            return "HIGH"
        else:
            return "CRITICAL"
    
    def get_priority(self, severity):
        """Get numeric priority score for incident triage (higher = more urgent)"""
        priority_map = {
            "LOW": 1,
            "MEDIUM": 2,
            "HIGH": 3,
            "CRITICAL": 4
        }
        return priority_map.get(severity, 0)

# Initialize global grader instance
grader = SeverityGrader()
