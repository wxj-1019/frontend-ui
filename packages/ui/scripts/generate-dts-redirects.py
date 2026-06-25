"""
DTS Redirect Generator

tsup's code splitting creates .js/.mjs files (e.g., dist/animations/fade-content.js)
alongside tsc-generated DTS subdirectories (dist/animations/fade-content/).
TypeScript's bundler module resolution matches the .js file first, ignoring the
DTS subdirectory, which causes all props to be inferred as `any`.

This script creates flat .d.ts redirect files that force TypeScript to resolve
to the subdirectory's index.d.ts.

Usage: Run after `tsc --declaration --emitDeclarationOnly --outDir dist`
       python scripts/generate-dts-redirects.py
"""

import os

CATEGORIES = [
    'animations', 'text-animations', 'backgrounds',
    'gsap-animations', 'components', 'blocks',
]

def generate_redirects(base_dir='dist'):
    count = 0
    
    # Process category subdirectories
    for cat in CATEGORIES:
        cat_dir = os.path.join(base_dir, cat)
        if not os.path.isdir(cat_dir):
            continue
        
        for f in os.listdir(cat_dir):
            js_path = os.path.join(cat_dir, f)
            if not f.endswith('.js') or not os.path.isfile(js_path):
                continue
            
            name = f[:-3]
            subdir = os.path.join(cat_dir, name)
            dts_path = os.path.join(cat_dir, name + '.d.ts')
            
            if os.path.isdir(subdir) and os.path.isfile(os.path.join(subdir, 'index.d.ts')):
                if not os.path.exists(dts_path):
                    with open(dts_path, 'w') as fout:
                        fout.write(f'export * from "./{name}/index";\n')
                    print(f'  CREATED: {dts_path}')
                    count += 1
    
    # Process top-level entries (high-perf-particles, three-scene, etc.)
    for f in os.listdir(base_dir):
        js_path = os.path.join(base_dir, f)
        if not f.endswith('.js') or not os.path.isfile(js_path):
            continue
        name = f[:-3]
        if name == 'index' or name.startswith('chunk-'):
            continue
        subdir = os.path.join(base_dir, name)
        dts_path = os.path.join(base_dir, name + '.d.ts')
        if os.path.isdir(subdir) and os.path.isfile(os.path.join(subdir, 'index.d.ts')) and not os.path.exists(dts_path):
            with open(dts_path, 'w') as fout:
                fout.write(f'export * from "./{name}/index";\n')
            print(f'  CREATED: {dts_path}')
            count += 1
    
    # Process hooks
    hooks_dir = os.path.join(base_dir, 'hooks')
    if os.path.isdir(hooks_dir):
        for f in os.listdir(hooks_dir):
            js_path = os.path.join(hooks_dir, f)
            if not f.endswith('.js') or not os.path.isfile(js_path):
                continue
            name = f[:-3]
            subdir = os.path.join(hooks_dir, name)
            dts_path = os.path.join(hooks_dir, name + '.d.ts')
            if os.path.isdir(subdir) and os.path.isfile(os.path.join(subdir, 'index.d.ts')) and not os.path.exists(dts_path):
                with open(dts_path, 'w') as fout:
                    fout.write(f'export * from "./{name}/index";\n')
                print(f'  CREATED: {dts_path}')
                count += 1
    
    return count

if __name__ == '__main__':
    import sys
    base = sys.argv[1] if len(sys.argv) > 1 else 'dist'
    print(f'Generating DTS redirects in {base}/...')
    n = generate_redirects(base)
    print(f'Done. {n} redirect files created.')
