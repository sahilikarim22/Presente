$(document).ready(function() {    
    
	$('#tablaPeriodos').DataTable({        
        language: {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast":"Último",
                    "sNext":"Siguiente",
                    "sPrevious": "Anterior"
			     },
			     "sProcessing":"Procesando...",
            },
        //para usar los botones   
        responsive: "true",
        dom: 'Bfrtilp',       
        buttons:[ 
			{
				extend:    'excelHtml5',
				text:      '<i class="fas fa-file-excel"></i> ',
				titleAttr: 'Exportar a Excel',
				className: 'btn btn-success'
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fas fa-file-pdf"></i> ',
				titleAttr: 'Exportar a PDF',
				className: 'btn btn-danger'
			},
			
		]	        
    });  
    
    
        // Abre el modal al hacer clic en el botón
        $('#abrirModal').on('click', function () {
            $('#modalAgregar').modal('show');
        });

        // Agrega datos al DataTable y guarda en localStorage
        $('#guardar').on('click', function () {
            var nombre = $('#nombre').val();
            var semanas = $('#semanas').val();

            // Agrega los datos al principio de la tabla
            tablaPeriodos.row.add([nombre, semanas]).draw(false);

            // Reordena la tabla para que el nuevo dato sea el primero
            var nuevaFila = tablaPeriodos.row(0).node();
            tablaPeriodos.row(nuevaFila).order([0, 'asc']).draw(false);

            // Guarda en localStorage
            var datos = JSON.parse(localStorage.getItem('periodos')) || [];
            datos.unshift({ nombre: nombre, semanas: semanas });
            localStorage.setItem('periodos', JSON.stringify(datos));

            // Cierra el modal
            $('#modalAgregar').modal('hide');
        });
    });
	
	