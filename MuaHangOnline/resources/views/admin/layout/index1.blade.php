<!DOCTYPE html>
<html lang="en">
@include('admin.layout.header')
<body class="" id="page-top">
<div class="" id="wraper">

    @include('admin.layout.sidebar')
    <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div class="" id="content">
                <!-- Topbar -->
                @include('admin.layout.topbar')
                <!-- End of Topbar -->


                <!-- Begin Page Content -->
                <div class="container-fluid">
                    @yield('content')
                </div>
                    <!-- /.container-fluid -->


            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2023</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->d
        </div>

        <!-- Content Wrapper -->

</div>





@include('admin.layout.script')

</body>
</html>
