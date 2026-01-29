import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from quiz.models import Question

# We use update_or_create to ensure the ID always stays 1-10
round2_questions = [
    {"id": 1, "text": "In AI, 'agent' refers to:", "option_a": "Software spy", "option_b": "Entity perceiving environment and acting", "option_c": "Database query", "option_d": "Network router", "correct_option": 1, "round": 2, "domain": "AI/ML"},
    {"id": 2, "text": "PEAS in AI stands for: Performance, Environment, Actuators, Sensors", "option_a": "True", "option_b": "False", "option_c": "Partially true", "option_d": "None", "correct_option": 0, "round": 2, "domain": "AI/ML"},
    {"id": 3, "text": "Search algorithm BFS explores:", "option_a": "Deep first", "option_b": "Level by level", "option_c": "Randomly", "option_d": "Backwards", "correct_option": 1, "round": 2, "domain": "AI/ML"},
    {"id": 4, "text": "In AI, heuristic means:", "option_a": "Exact solution", "option_b": "Rule of thumb", "option_c": "Hardware rule", "option_d": "Data rule", "correct_option": 1, "round": 2, "domain": "AI/ML"},
    {"id": 5, "text": "Which tree traversal is like stack?", "option_a": "Inorder", "option_b": "Preorder", "option_c": "Postorder", "option_d": "Level order", "correct_option": 1, "round": 2, "domain": "Data Science"},
    {"id": 6, "text": "Prolog is used for:", "option_a": "Graphics", "option_b": "Logic programming", "option_c": "Web dev", "option_d": "OS kernels", "correct_option": 1, "round": 2, "domain": "AI/ML"},
    {"id": 7, "text": "Alpha-Beta pruning in games:", "option_a": "Increases nodes", "option_b": "Reduces search tree", "option_c": "Adds branches", "option_d": "Ignores moves", "correct_option": 1, "round": 2, "domain": "AI/ML"},
    {"id": 8, "text": "Recursion base case prevents:", "option_a": "Fast execution", "option_b": "Infinite loop", "option_c": "Memory leak", "option_d": "All", "correct_option": 1, "round": 2, "domain": "Data Science"},
    {"id": 9, "text": "In sorting, which is stable?", "option_a": "Quick sort", "option_b": "Merge sort", "option_c": "Heap sort", "option_d": "Selection sort", "correct_option": 1, "round": 2, "domain": "Data Science"},
    {"id": 10, "text": "Which data structure is LIFO?", "option_a": "Queue", "option_b": "Stack", "option_c": "Tree", "option_d": "Graph", "correct_option": 1, "round": 2, "domain": "Data Science"}
]

for q_data in round2_questions:
    Question.objects.update_or_create(id=q_data['id'], defaults=q_data)

print(f"✅ Round 2 (10 Questions) is now live in the database.")
