class UsersController < ApplicationController
	respond_to :json
	def index
		@users = User.all
		respond_with @users, each_serializer: UserSerializer
	end
	def create
		@user = User.new(user_params)
		if @user.save
			render json: @user, status: :created
		end
	end
	def update
		@user = User.find(params[:id])
		if @user.update_attributes(user_params)
			render json: @user, status: :accepted
		else
			render json: @user.errors, status: :internal_server_error
		end
	end
	def destroy
		@user = User.find(params[:id])
		if @user.destroy
			render json: @user, status: :ok
		else
			render json: @user.errors, status: :internal_server_error
		end
	end
	private
	def user_params
		params.require(:user).permit(:name, :email)
	end
end
