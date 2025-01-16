import os
import re
import requests
from bs4 import BeautifulSoup


def get_snake_case(icon):
    return re.sub(r'(?<!^)(?=[A-Z])', '_', icon).lower()


def get_icon_badges(name):
    url = f"https://tabler.io/icons/icon/{name}"
    response = requests.get(url)

    if response.status_code == 200:
        # print(response.content)
        # return None
        soup = BeautifulSoup(response.content, 'html.parser')
        all_badges = soup.find_all('span', class_='badge')
        badge_texts = [badge.text for badge in all_badges if
                       badge.text.lower() != 'new' and badge.text.lower() != 'new version!']
        return badge_texts
    else:
        #print(f"Failed to retrieve {icon_name}")
        return None


def extract_keys_from_react_file(path):
    # Read the contents of the React file
    with open(path, 'r') as file:
        content = file.read()

    # Regular expression to match the 'key' values in the iconList array
    key_pattern = r"key:\s*'([^']+)'"

    # Find all matches for the key pattern
    key_paths = re.findall(key_pattern, content)

    return key_paths


def extract_icon_list_from_react_file(path):
    with open(path, 'r') as file:
        content = file.read()
        return content


file_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../../..', 'frontend/web/src/components/icons/iconsFilled.jsx'))

# Extract keys
keys = extract_keys_from_react_file(file_path)

# Output the results
# print("Extracted keys:", keys)

# print badges for each tabler icon
icon_dict = {}
for icon_name in keys:
    print('processing icon: ', icon_name)
    snake_case = get_snake_case(icon_name.replace('Icon', '').replace('Filled', '')).replace('_', '-')
    badges = get_icon_badges(snake_case)
    icon_dict[icon_name] = badges
    # print(f"Badges for {icon_name}: {badges}")

#


icon_list_raw = extract_icon_list_from_react_file(file_path)
pattern = r'\{.*?\},'
matches = re.findall(pattern, icon_list_raw, re.DOTALL)

# Print each object
for i, match in enumerate(matches, 1):
    key_pattern = r"key:\s*'([^']+)'"
    icon_name = re.findall(key_pattern, match)[0]
    icon_badge_list = ' '.join(icon_dict[icon_name])
    quoted_list = [f'"{item}"' for item in icon_badge_list.split()]

    # Join the list with commas
    icon_badge_list = f"[{', '.join(quoted_list)}]"

    # Remove the closing brace from the original match
    modified_match = match.rstrip('},')
    base_indent = len(modified_match) - len(modified_match.lstrip())
    indent = ' ' * base_indent

    # Add the badges and closing brace
    print(f"\t{modified_match}\n\tbadges: {icon_badge_list}\n    }},\t")
