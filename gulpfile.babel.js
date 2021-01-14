import gulp from 'gulp'
//html
import htmlmin from 'gulp-htmlmin'
//js
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import concat from 'gulp-concat'

//css
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

//SASS
import sass from 'gulp-sass'

//optimizar imagenes
import imagemin from 'gulp-imagemin'

//browser-sync 
import { init as server, stream, reload } from 'browser-sync'

//Constantes
const cssPlugins = [cssnano(), autoprefixer()]

//Tarea para minimizar el codigo css
gulp.task('styles', () => {
    return gulp
        .src('./src/css/*.css') //de donde coge los arvhivos
        .pipe(concat('style-min.css')) //para meter todos los css en un archivo minificado
        .pipe(postcss(cssPlugins)) //
        .pipe(gulp.dest('./public/css')) //donde nos deja el codigo convertido
})

//Tarea para minimizar el codigo html
gulp.task('html-min', () => {
    return gulp
        .src('./src/*.html') //de donde coge los arvhivos
        .pipe(htmlmin({
            collapseWhitespace: true, //quitar espacios en blano
            removeComments: true //quitar espacios
        }))
        .pipe(gulp.dest('./public/')) //donde nos deja el codigo convertido
})

gulp.task('html-min-views', () => {
    return gulp
        .src('./src/views/*.html') //de donde coge los arvhivos
        .pipe(htmlmin({
            collapseWhitespace: true, //quitar espacios en blano
            removeComments: true //quitar espacios
        }))
        .pipe(gulp.dest('./public/views')) //donde nos deja el codigo convertido
})

//Tarea para convertir el codigo a es5
gulp.task('babel', () => {
    return gulp
        .src('./src/js/*.js') //de donde coge los arvhivos
        //metodos que no pertenecen a gulp directamente se usa pipe
        .pipe(concat('scripts-min.js')) //para meter todos los js en un archivo, le pasamos por parametro el nombre que queremos que tenga el arcihvo donde se va a encontrar todo concatenado
        .pipe(babel({
            presets: ['@babel/env'] //el presets que vamos a usar para convertir el codigo
        }))
        .pipe(terser()) //para ofuscar el codigo 
        .pipe(gulp.dest('./public/js')) //donde nos deja el codigo convertido
})



//SASS
gulp.task('sass', () => {
    return gulp
        .src('./src/css/**.scss') //de donde coge los arvhivos
        .pipe(sass({
            outputStyle: 'compressed'
        })) //para utilizar sass
        .pipe(gulp.dest('./public/css')) //donde nos deja el codigo convertido
        .pipe(stream())
})



//clean css (No se ejecutara siempre, solo cuando queramos limpiar el codigo css)
gulp.task('clean', () => {
    return gulp
        .src('./public/css/style.scss') //de donde coge los arvhivos
        .pipe(clean({
            content: ['./public/*.html'] //ruta de los archivos html para saber si se esta utlizando
        }))
        .pipe(gulp.dest('./public/css')) //donde nos deja el codigo convertido
})



//Optimizacion de imagenes
gulp.task('imgmin', () => {
    return gulp
        .src('./src/assets/imagenes/*') //de donde coge los arvhivos 
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ qualitu: 30, progressive: true }),
            imagemin.optipng({ optimization: 1 })
        ]))
        .pipe(gulp.dest('./public/assets/imagenes')) //donde nos deja el codigo convertido
})


//browser-sync 
gulp.task('default', () => {
    server({
        server: './public'
    })

    gulp.watch('./src/*.html', gulp.series('html-min')).on('change', reload)
    gulp.watch('./src/views/*.html', gulp.series('html-min-views')).on('change', reload)
    gulp.watch('./src/css/*.scss', gulp.series('sass')).on('change', reload)
    gulp.watch('./src/css/**/*.scss', gulp.series('sass')).on('change', reload)
    gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload)
    gulp.watch('./src/js/**/*.js', gulp.series('babel')).on('change', reload)
    gulp.watch('./src/assets/imagenes/*', gulp.series('imgmin')).on('change', reload)
})

//gulp build, ejecutar el minificado
gulp.task('build', gulp.series('html-min', 'html-min-views', 'sass', 'babel', 'imgmin'))