# frozen_string_literal: true

module ApplicationHelper
  FLASH_MESSAGE_TYPES = %i[alert notice error warning success danger].freeze

  def flash_messages(flash)
    FLASH_MESSAGE_TYPES.map do |type|
      if flash[type].present?
        message = content_tag(:span, flash[type], class: 'block')
        content_tag(:div, message.html_safe, class: "alert-message #{type}")
      end
    end.join("\n").html_safe
  end

  def icon(icon_name, options = {})
    wrapper_classes = [options.delete(:class)].compact.push('icon').join(' ')
    icon_options = { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'feather' }.merge(options)
    if options[:size].present?
      icon_options[:width] = options[:size]
      icon_options[:height] = options[:size]
      icon_options.delete(:size)
    end
    use = content_tag(:use, nil, 'xlink:href': image_url("feather-sprite.svg##{icon_name}"))
    svg = content_tag(:svg, use, icon_options)
    content_tag(:span, svg.html_safe, class: wrapper_classes)
  end
end
