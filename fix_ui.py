import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # Check for react-router-dom
    if 'react-router-dom' in content:
        content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useRouter } from 'next/navigation';")
        content = content.replace("useNavigate", "useRouter")
        content = content.replace("navigate(", "router.push(")
        modified = True

    # Check for use client
    if ('useState' in content or 'useEffect' in content or 'useRouter' in content or 'framer-motion' in content or 'onClick' in content) and not content.startswith("'use client'"):
        content = "'use client';\n" + content
        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
            process_file(os.path.join(root, file))
