import os
import re
from pathlib import Path

def check_links():
    root_dir = Path('.')
    html_files = list(root_dir.rglob('*.html'))
    
    broken_links = []
    
    for html_file in html_files:
        if 'node_modules' in html_file.parts or '.git' in html_file.parts:
            continue
            
        with open(html_file, 'r', encoding='utf-8') as f:
            try:
                content = f.read()
            except UnicodeDecodeError:
                continue
                
        # Find href="..." and src="..." and data-include="..."
        links = re.findall(r'(?:href|src|data-include)="([^"]+)"', content)
        
        for link in links:
            # Ignore external links, mailto, tel, empty, anchors
            if link.startswith('http') or link.startswith('mailto:') or link.startswith('tel:') or link.startswith('#') or not link:
                continue
                
            # If absolute path (e.g. /assets/css/global.css), check from root
            if link.startswith('/'):
                target = root_dir / link[1:]
            else:
                # Relative path
                target = html_file.parent / link
            
            # Since Vercel strips .html, if the target doesn't exist but target + .html exists, it's valid for cleanUrls!
            target_resolved = target.resolve()
            
            # Check if file/dir exists
            exists = target.exists()
            if not exists:
                # Check if it has no extension, maybe it's a cleanUrl pointing to .html
                if not target.suffix and Path(str(target) + '.html').exists():
                    exists = True
                # Check if it points to a directory and there is an index.html
                elif target.is_dir() and (target / 'index.html').exists():
                    exists = True
                # Sometimes people link to .html but the file is .html, so target.exists() is true
                
            if not exists:
                broken_links.append((str(html_file), link, str(target)))
                
    if broken_links:
        print("Broken links found:")
        for source, link, target in broken_links:
            print(f"File: {source} -> Link: {link} (Expected at: {target})")
    else:
        print("All local links are well referenced!")

check_links()
