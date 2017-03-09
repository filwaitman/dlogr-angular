EXTRA_VARIABLES = {
    'ctrl': {
        'error': '{{ $ctrl.error }}',
    },
    'event': {
        'human_identifier': '{{ event.human_identifier }}',
        'message': '{{ event.message }}',
        'object_type': '{{ event.object_type }}',
        'object_id': '{{ event.object_id }}',
        'timestamp': '{{ event.timestamp }}',
    },
    'block': {
        'super': '{{ block.super }}',
    },
}
