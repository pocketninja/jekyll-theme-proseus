# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-proseus"
  spec.version       = "0.1.0"
  spec.authors       = ["pocketninja"]
  spec.email         = ["daniel.eherbert@gmail.com"]

  spec.summary       = "A simple theme, created for short pieces of prose."
  spec.homepage      = "https://github.com/pocketninja/jekyll-theme-proseus"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
